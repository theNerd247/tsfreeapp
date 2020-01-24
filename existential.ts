import { HKT2, Kind2, URIS2 } from 'fp-ts/lib/HKT'

const URI = "Existential"
type URI = typeof URI

export interface Existential<F extends URIS2, A>
  { <R>(cont : <E>(t : Kind2<F,A,E>) => R) : R
  }
  
const liftExt = <F extends URIS2,A,E>(x : Kind2<F,A,E>) : Existential<F,A> =>
  <R>(cont : <X>(t : Kind2<F,A,X>) => R) => cont(x) 

interface FooE<A,E> {
  _tag : "FooE"
  a    : A
  ex   : E
}

const fooE_ = <A,E>(a : A, ex : E) : FooE<A,E> => (
  { _tag : "FooE" 
  , a 
  , ex
  }
)

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E,A> {
    FooE: FooE<E,A>
  }
}

const FooURI = "FooE"
type FooURI = typeof FooURI

type Foo<A> = Existential<FooURI,A>

const foo = <A,E>(a : A, ex : E) : Foo<A> =>
  liftExt<FooURI,A,E>(fooE_(a, ex))

const foos : Foo<string>[] = 
  [ foo("boo", 2)
  , foo("bar", true)
  ]


