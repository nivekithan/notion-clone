

declare module "shallow-equal" {
  export const shallowEqualArrays = (a : any[], b : any[]) : boolean
  export const shallowEqualObjects = (a : {[i : string] : any}, b : {[i : string] : any}) : boolean
}