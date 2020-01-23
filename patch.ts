//import { Functor1 } from 'fp-ts/lib/Functor'
//import { pipeable } from 'fp-ts/lib/pipeable'
//
//export const URI = "Patch"
//export type URI  = typeof URI
//
//export interface Patch<A>
//  { _tag   : "Patch"
//    newVal : A
//  }
//
//declare module 'fp-ts/lib/HKT' {
//  interface URIToKind1<A> {
//    Patch : Patch<A>
//  }
//}
//
//export const mkPatch = <A>(newVal : A) : Patch<A> => (
//  { _tag : "Patch"
//  , newVal
//  }
//)
//
//const map = <A, B>(p : Patch<A>, f : (a : A) => B) : Patch<B> =>
//  mkPatch(f(p.newVal))
//
//export const patch : Functor1<URI> = {
//  URI,
//  map
//}
//
//export const { map } = pipeable(patch)
