import { promisify } from "util"
import { randomBytes, scrypt as _scrypt } from "crypto"

const scrypt = promisify(_scrypt)

const encrypt = async (text: string) => {
  const salt = randomBytes(8).toString("hex")
  const hash = (await scrypt(text, salt, 32)) as Buffer
  return salt + "." + hash.toString("hex")
}

const compare = async (hash: string, base: string): Promise<boolean> => {
  const [salt, storedHash] = hash.split(".")
  const newHash = await scrypt(hash, salt, 32)

  return storedHash == newHash
}

export { encrypt, compare }
