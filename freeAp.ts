//import { Functor1 } from 'fp-ts/lib/Functor'
//import { pipeable } from 'fp-ts/lib/pipeable'
//import { HKT, HKT2 } from 'fp-ts/lib/HKT'
//
//interface Pure<F,A,E> 
//  { _tag : "Pure"
//    val : A
//  }
//
//const pure_ = <F,A,E>(val : A) : Pure<F,A,E> => (
//  { _tag : "Pure"
//  , val
//  }
//)
//
//interface FreeApF<F,A,E>
//  { _tag : "FreeApF"
//    val : HKT<F, (b : E) => A>
//    apB : FreeAp<F,E>
//  }
//
//const freeApF_ = <F,A,E>(val : HKT<F, (b : E) => A>, apB : FreeAp<F,E>) : FreeApF<F,A,E> => (
//  { _tag : "FreeApF"
//  , val
//  , apB
//  }
//)
//
//type FreeApE<F,A,E> = Pure<F,A,E> | FreeApF<F,A,E>
//
//const FreeApEURI = "FreeApE"
//type FreeApEURI = typeof FreeApEURI
//
//declare module 'fp-ts/lib/HKT' {
//
//  interface URIToKind3<F, A, B> {
//    FreeApE : FreeApE<F, A, B>
//  }
//}
