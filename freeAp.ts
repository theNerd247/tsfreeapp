import { Kind, URIS, URIS2 } from 'fp-ts/lib/HKT'
import { Existential3, mapExt } from './existential'
import { Functor2 } from 'fp-ts/lib/Functor'

interface Pure<F,A,E> 
  { _tag : "Pure"
    val : A
  }

const pure_ = <F,A,E>(val : A) : Pure<F,A,E> => (
  { _tag : "Pure"
  , val
  }
)

interface FreeApF<F extends URIS,A,E>
  { _tag : "FreeApF"
    val : Kind<F, (b : E) => A>
//    apB : FreeAp<F,E>
  }

const freeApF_ = <F extends URIS,A,E>(val : Kind<F, (b : E) => A> /*, apB : FreeAp<F,E> */) : FreeApF<F,A,E> => (
  { _tag : "FreeApF"
  , val
 // , apB
  }
)

type FreeApE<F extends URIS,A,E> = Pure<F,A,E> | FreeApF<F,A,E>

const FreeApEURI = "FreeApE"
type FreeApEURI = typeof FreeApEURI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind3<R extends URIS, E, A> {
    FreeApE : FreeApE<R, E, A>
  }
}

//type FreeAp<F extends URIS, A> = Existential3<FreeApEURI, F, A>
//
//const URI = "FreeAp"
//type URI = typeof URI
//
//
//declare module 'fp-ts/lib/HKT' {
//  interface URItoKind2<E extends URIS, A> {
//    FreeAp : FreeAp<E, A>
//  }
//}
