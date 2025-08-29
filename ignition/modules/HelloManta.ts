import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("HelloMantaModule", (m) => {
  const helloMessage = m.contract("HelloManta", ["Hello Manta!"]);

  return { helloMessage };
});
