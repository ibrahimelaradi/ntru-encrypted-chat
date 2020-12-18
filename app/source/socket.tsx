import React, {
	createContext,
	DependencyList,
	FC,
	useContext,
	useEffect,
	useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { useEndpoint } from "./context/ntru";

const initialSocket = io("http://localhost:3000", { path: "/chat" });

type SocketContext = {
	socket: Socket;
	id?: string;
	room?: string;
	setRoom(room: string): void;
};

const initialContext: SocketContext = {
	socket: initialSocket,
	setRoom: () => {},
};

const Context = createContext<SocketContext>(initialContext);

const Provider: FC = ({ children }) => {
	const endpoint = useEndpoint();
	const [id, setId] = useState<string>();
	const [socket] = useState<Socket>(io(endpoint, { path: "/chat" }));
	const [room, setRoom] = useState<string>();
	useEffect(() => {
		console.log(endpoint);
		socket.connect();
		socket.on("connected", (id: string) => {
			setId(id);
			socket.off("connected");
		});
	}, [endpoint]);
	return (
		<Context.Provider value={{ ...initialContext, socket, id, room, setRoom }}>
			{children}
		</Context.Provider>
	);
};

function useEvent(
	ev: string,
	fn: (...args: any[]) => void,
	deps?: DependencyList
) {
	const context = useContext(Context);
	useEffect(() => {
		context.socket.off(ev);
		context.socket.on(ev, fn);
		return () => {
			context.socket.off(ev);
		};
	}, deps || []);
}

function useEmitter(ev: string): (...args: any[]) => void {
	const context = useContext(Context);
	function emit(...args: any[]) {
		context.socket.emit(ev, ...args);
	}

	return emit;
}

function useID(): string | undefined {
	return useContext(Context).id;
}

function useRoom(): { room?: string; setRoom: (room: string) => void } {
	const { room, setRoom } = useContext(Context);
	return {
		room,
		setRoom,
	};
}

export { Context, Provider, useEvent, useEmitter, useID, useRoom };
