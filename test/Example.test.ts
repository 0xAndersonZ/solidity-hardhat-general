import { deployments, ethers, network } from "hardhat"
import { LOCAL_DEV_NETWORK_NAMES } from "../utils/constants"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

import * as C from "../typechain-types"
import { expect } from "chai"

!LOCAL_DEV_NETWORK_NAMES.includes(network.name)
    ? describe.skip
    : describe("Example", () => {
          let deployer: SignerWithAddress
          let mainC: C.Example

          beforeEach(async () => {
              deployer = (await ethers.getSigners())[0]
              const mainCAddress = (await deployments.fixture(["all"]))["Example"].address
              mainC = (await ethers.getContractAt("Example", mainCAddress)) as C.Example
          })

          it("initial states", async () => {
              expect(await mainC.value()).to.be.equal(0)
              expect(await mainC.owner()).to.be.equal(deployer.address)
          })

          it("only owner can set new value", async () => {
              const fakeOwner = (await ethers.getSigners())[1]
              await expect(mainC.connect(fakeOwner).setValue(1)).to.be.revertedWith(
                  "Ownable: caller is not the owner"
              )
              await mainC.connect(deployer).setValue(1)
              expect(await mainC.value()).to.be.equal(1)
          })
      })
