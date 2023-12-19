import { CryptService } from "../../../core/application/services/crypt.service";
import { UserRepository } from "../domain/repositories/user";
import { User, UserProperties } from "../domain/user";
import { UserResponseDto } from "./dtos/user-response.dto";

export class UserApplication {
  constructor(private readonly repository: UserRepository) {}

  async save(user: User) {
    const passwordHash = await CryptService.hash(user.properties().password);
    user.update({ password: passwordHash });
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

    if (!result.value) {
      return null;
    }

    return UserResponseDto.fromDomainToResponse(result.value);
  }

  async findByEmail(email: string) {
    const result = await this.repository.findByEmail(email);
    if (result.isErr()) {
      return;
    }

    if (!result.value) {
      return null;
    }

    return UserResponseDto.fromDomainToResponse(result.value, true);
  }

  async find() {
    const result = await this.repository.find();
    if (result.isErr()) {
      return;
    }

    return UserResponseDto.fromDomainToResponse(result.value);
  }

  async getByPage(page: number, pageSize: number) {
    const result = await this.repository.getByPage(page, pageSize);
    if (result.isErr()) {
      return;
    }

    return result.value;
  }
}
