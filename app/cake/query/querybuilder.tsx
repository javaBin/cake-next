'use client'

import React, {ChangeEvent, useState} from 'react';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface Operator {
  label: string;
  value: string;
}

interface Condition {
  field: string;
  operator: string;
  value: string;
  logicalOperator: string;
}

interface QueryBuilderProps {
  fields: string[];
  onExecute: (query: any) => void;
}

const operators: Operator[] = [
  { label: 'Equals', value: '$eq' },
  { label: 'Not Equals', value: '$ne' },
  { label: 'Greater Than', value: '$gt' },
  { label: 'Greater Than Equals', value: '$gte' },
  { label: 'Less Than', value: '$lt' },
  { label: 'Less Than Equals', value: '$lte' },
  { label: 'In', value: '$in' },
  { label: 'Not In', value: '$nin' },
  { label: 'Exists', value: '$exists' },
  { label: 'Type', value: '$type' },
  { label: 'Mod', value: '$mod' },
  { label: 'Regex', value: '$regex' },
  { label: 'Text', value: '$text' },
  { label: 'Where', value: '$where' },
  { label: 'All', value: '$all' },
  { label: 'ElemMatch', value: '$elemMatch' },
  { label: 'Size', value: '$size' },
  { label: 'Array Element Index', value: '$' },
  { label: 'Array Element All', value: '$[]' },
  { label: 'Array Element Filter', value: '$[<identifier>]' }
];

const logicalOperators: Operator[] = [
  { label: 'AND', value: '$and' },
  { label: 'OR', value: '$or' },
  { label: 'NOT', value: '$not' },
  { label: 'NOR', value: '$nor' }
];

const CustomQueryBuilder: React.FC<QueryBuilderProps> = ({ fields, onExecute }) => {
  const [conditions, setConditions] = useState<Condition[]>([{ field: '', operator: '', value: '', logicalOperator: logicalOperators[0].value }]);
  const [logicalOperator, setLogicalOperator] = useState<string>(logicalOperators[0].value);

  const addCondition = () => {
    setConditions([...conditions, { field: '', operator: '', value: '', logicalOperator: logicalOperators[0].value }]);
  };

  const updateCondition = (index: number, updatedCondition: Condition) => {
    setConditions(conditions.map((condition, i) => i === index ? updatedCondition : condition));
  };

  const executeQuery = () => {
    const query = conditions.reduce((query, condition) => {
      // @ts-ignore
      query[condition.field] = { [condition.operator]: condition.value };
      return query;
    }, {});

    onExecute({ [logicalOperator]: query });
  };

  return (
    <div>
      {conditions.map((condition, index) => (
        <div key={index}>
          <Select value={condition.field} onValueChange={(value: string) => updateCondition(index, { ...condition, field: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Field" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fields.map(field => (
                  <SelectItem key={field} value={field}>{field}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={condition.operator} onValueChange={(value: string) => updateCondition(index, { ...condition, operator: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {operators.map(operator => (
                  <SelectItem key={operator.value} value={operator.value}>{operator.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            value={condition.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => updateCondition(index, { ...condition, value: event.target.value })}
          />
          <Select value={condition.logicalOperator} onValueChange={(value: string) => updateCondition(index, { ...condition, logicalOperator: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Logical Operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {logicalOperators.map(operator => (
                  <SelectItem key={operator.value} value={operator.value}>{operator.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}
      <Button onClick={addCondition}>Add Condition</Button>
      <Button onClick={executeQuery}>Execute Query</Button>
    </div>
  );
}

export default CustomQueryBuilder;
