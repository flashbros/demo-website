export async function POST() {
  const execSync = require("child_process").execSync;
  // import { execSync } from 'child_process';  // replace ^ if using ES modules

  const output = execSync("ls", { encoding: "utf-8" }); // the default is 'buffer'
  const splitted = output.split(/\r?\n/);
  const filtered = splitted.filter((e) => {
    return e !== "";
  });

  return Response.json(JSON.stringify(filtered));
}

export async function GET() {
  const execSync = require("child_process").execSync;

  execSync("docker container restart smart-backend", { encoding: "utf-8" });

  return Response.json("d1");
}
