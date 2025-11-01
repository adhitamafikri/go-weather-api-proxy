import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme, Heading, Text, Flex } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <header>
          {/* <h1>Weather API Proxy</h1> */}
          <Heading size="6" as="h1">
            Weather API Proxy
          </Heading>
        </header>
        <main>
          <App />
        </main>
        <footer>
          <Flex justify="center" align="center" height="100%">
            <Text size="1" as="p" color="gray">
              adhitamafikri - Weather API Proxy
            </Text>
          </Flex>
        </footer>
      </Theme>
    </QueryClientProvider>
  </StrictMode>
);
