type myPartial<T> = {
  [P in keyof T]?: T[P];
};



//?————————————————————————————————————————
interface Person {
  name: string;
  age: number;
  address: string;
}

const p0:Person={
  name:'wsp'
}
type PartialPerson = myPartial<Person>;
const p1:PartialPerson={
  name:'wsp'
}


type myRequired<T> = {
  [P in keyof T]-?: T[P];
};

type myReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

