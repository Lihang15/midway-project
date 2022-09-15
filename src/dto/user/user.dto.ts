import { Rule, RuleType } from '@midwayjs/validate';

export class UserDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.number().max(60).required())
  age: number;
}
