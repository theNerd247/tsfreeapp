import { Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from 'fp-ts/lib/HKT'

const URI = "Existential"
type URI = typeof URI

export interface Existential<F extends URIS>
  { runExt : <R>(cont : <E>(t : Kind<F, E>) => R) => R
  }
  
export interface Existential2<F extends URIS2, A>
  { runExt : <R>(cont : <E>(t : Kind2<F, A, E>) => R) => R
  }

export interface Existential3<F extends URIS3, A, B>
  { runExt : <R>(cont : <E>(t : Kind3<F,A, B, E>) => R) => R
  }
  
export interface Existential4<F extends URIS4, A, B, C>
  { runExt : <R>(cont : <E>(t : Kind4<F,A, B, C, E>) => R) => R
  }
  
  
export function liftExt<F extends URIS4,A,B,C,E>(x : Kind4<F,A,B,C,E>) : Existential4<F,A,B,C> 
export function liftExt<F extends URIS3,A,B,E>(x : Kind3<F,A,B,E>) : Existential3<F,A,B>
export function liftExt<F extends URIS2,A,E>(x : Kind2<F,A,E>) : Existential2<F,A> 
export function liftExt<F extends URIS,E>(x : Kind<F,E>) : Existential<F> {
  return { runExt : (cont) => cont(x) }
}

export function mapExt<F extends URIS4, A, B, C, AA, BB, CC>(f : <E>(a : Kind4<F, A, B, C, E>) => Kind4<F, AA, BB, CC, E>, x : Existential4<F, A, B, C>) : Existential4<F, AA, BB, CC>
export function mapExt<F extends URIS3, A, B, AA, BB>(f : <E>(a : Kind3<F, A, B, E>) => Kind3<F, AA, BB, E>, x : Existential3<F, A, B>) : Existential3<F, AA, BB>
export function mapExt<F extends URIS2, A, B>(f : <E>(a : Kind2<F,A,E>) => Kind2<F,B,E>, x : Existential2<F,A>) : Existential2<F,B>
export function mapExt<F extends URIS>(f : <E>(a : Kind<F,E>) => Kind<F,E>, x : Existential<F>) : Existential<F> {
  return liftExt(x.runExt(f))
}
