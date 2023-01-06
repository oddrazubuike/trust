import { Box, Text } from "degen";

const Footer = () => {
  return (
    <>
      <Box
        borderTopWidth="0.5"
        borderColor="foregroundTertiary"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        marginX="auto"
        paddingY="4"
      >
        <Box marginX="auto" marginY="2">
          <Text align="center" size="small">
            © 2023 Trust 
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
