import React, { FC } from "react";
import { Text, Box } from "ink";

const message: FC<{ author: string; message: string }> = ({
	author,
	message,
}) => {
	return (
		<Box
			flexGrow={0}
			alignItems="center"
			justifyContent="flex-start"
			flexDirection="row"
		>
			<Text color="green">{author}: </Text>
			<Text>{message}</Text>
		</Box>
	);
};

export default message;
