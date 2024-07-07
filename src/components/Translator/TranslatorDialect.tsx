import { FC } from "react";
import { Select } from "../Select";

export const TranslatorDialect: FC = () => {
  return (
    <Select label="方言" name="dialect">
      <optgroup label="北海道・南西">
        <option value="沙流">沙流</option>
        <option value="千歳">千歳</option>
        <option value="鵡川">鵡川</option>
        <option value="幌別">幌別</option>
      </optgroup>

      <optgroup label="北海道・北東">
        <option value="静内">静内</option>
        <option value="十勝">十勝</option>
        <option value="釧路">釧路</option>
        <option value="様似">様似</option>
        <option value="美幌">美幌</option>
        <option value="石狩">石狩</option>
        <option value="阿寒">阿寒</option>
      </optgroup>
    </Select>
  );
};
