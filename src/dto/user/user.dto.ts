import { Rule, RuleType } from '@midwayjs/validate';

export class UserDTO {
  @Rule(RuleType.number().required())
  name: string;

  @Rule(RuleType.number().max(60).required())
  age: number;
}