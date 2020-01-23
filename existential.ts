import { HKT, HKT2, Kind2, URIS2 } from 'fp-ts/lib/HKT'

const ExtURI = "Existential"
type ExtURI = typeof ExtURI

export interface Existential<F extends URIS2, A> {
  readonly URI: F
  <R>(cont : <E>(t : Kind2<F,A,E>) => R) : R
}

//const mkExistential = <F,A,E>(x : HKT2<F,A,E>) : Existential<F,A> =>
//  <R>(cont : <E>(t : HKT2<F,A,E>) => R) => cont(x)

declare module 'fp-ts/lib/HKT' {
  
}
