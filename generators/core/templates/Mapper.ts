export interface IMapper<Entity, Props> {
  map: (props: Props) => Entity;
}
