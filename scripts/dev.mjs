import { spawn } from "node:child_process";
import { createConnection } from "node:net";

const defaultPort = 3000;
const host = "0.0.0.0";

function isPortInUse(port) {
  return new Promise((resolve) => {
    const socket = createConnection({ port, host }, () => {
      socket.end();
      resolve(true);
    });

    socket.setTimeout(1000, () => {
      socket.destroy();
      resolve(false);
    });

    socket.on("error", () => resolve(false));
  });
}

async function getAvailablePort(startPort) {
  let port = startPort;

  while (await isPortInUse(port)) {
    port += 1;
  }

  return port;
}

async function main() {
  const port = await getAvailablePort(defaultPort);
  const url = `http://localhost:${port}`;

  if (port !== defaultPort) {
    console.log(
      `\nPort ${defaultPort} is already in use. Starting dev server at ${url} instead.\n`,
    );
  } else {
    console.log(`\nStarting dev server at ${url} ...\n`);
  }

  const child = spawn(
    "npx",
    ["next", "dev", "--webpack", "-H", host, "-p", String(port)],
    {
      stdio: "inherit",
      shell: true,
    },
  );

  child.on("close", (code) => {
    process.exit(code ?? 0);
  });
}

main();
