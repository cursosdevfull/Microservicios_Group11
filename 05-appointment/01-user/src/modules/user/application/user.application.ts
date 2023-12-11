import { UserRepository } from "../domain/repositories/user";
import { User, UserProperties } from "../domain/user";

export class UserApplication {
  constructor(private readonly repository: UserRepository) {}

  async save(user: User) {
    await this.repository.save(user);
  }

  async delete(id: string) {
    const result = await this.repository.findById(id);
    if (result.isErr()) {
      return;
    }
    const user = result.value;
    user.delete();
    return await this.repository.save(user);
  }

  async update(fields: UserProperties, id: string) {
    const result = await this.repository.findById(id);
    if (result.isErr()) {
      return;
    }
    const user = result.value;
    user.update(fields);
    await this.repository.save(user);
  }

  async findById(id: string) {
    const result = await this.repository.findById(id);
    if (result.isErr()) {
      return;
    }

    return result.value;
  }

  async find() {
    const result = await this.repository.find();
    if (result.isErr()) {
      return;
    }

    return result.value;
  }

  async getByPage(page: number, pageSize: number) {
    const result = await this.repository.getByPage(page, pageSize);
    if (result.isErr()) {
      return;
    }

    return result.value;
  }
}
