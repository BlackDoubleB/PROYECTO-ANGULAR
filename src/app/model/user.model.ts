import { Deserializable } from '../config/interfaces/deserializable.interface';

export class User implements Deserializable {
  public username = '';
  public nombres = '';
  public rol = '';
  public idConsumidor = 0;

  deserialize(input: any): this {
    (Object as any).assign(this, input);
    return this;
  }
}
