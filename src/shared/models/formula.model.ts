export class Formula {
  id: number;
  name: string;
  childFormulas: Formula[];
  category: string;
  abbreviation: string;
  parentId: number;
  hasChildren: boolean;
  function: string; //todo:  add this to database as a field.
  value: number;

  constructor(id: number,
              name: string,
              childFormulas: Formula[],
              category: string,
              abbreviation: string,
              parentId: number,
              hasChildren: boolean) {
    this.id = id;
    this.name = name;
    this.childFormulas = childFormulas;
    this.category = category;
    this.abbreviation = abbreviation;
    this.parentId = parentId;
    this.hasChildren = hasChildren;
  }
}
