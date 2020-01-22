interface Tagged<T> { _tag : T }

interface PatchA<A> extends Tagged<"PatchA"> 
  { newVal : A
  }

const patch_ = <A>(newVal : A) : PatchA<A> => (
  { _tag : "PatchA"
  , newVal
  }
)

interface Pure<A,B> extends Tagged<"Pure"> 
  { val : A
  }

const pure_ = <A,B>(val : A) : Pure<A,B> => (
  { _tag : "Pure"
  , val
  }
)

interface ApE<A,B> extends Tagged<"Ap"> {
  val : PatchA<(b : B) => A>
  apB : Ap<B>
}

const apE_ = <A,B>(val : PatchA<(b : B) => A>, apB : Ap<B>) : ApE<A,B> => (
  { _tag : "Ap"
  , val
  , apB
  }
)

type ApF<A,B> = Pure<A,B> | ApE<A,B>

type Ap<A> = <R>(cont : <X>(t : ApF<A,X>) => R) => R

const liftApF = <A,B>(apF : ApF<A,B>) : Ap<A> => 
  <R>(cont : <X>(t : ApF<A,X>) => R) => cont(apF)

const pure = <A>(a : A) : Ap<A> => 
  liftApF(pure_(a))

const apE = <A,B>(val : PatchA<(b : B) => A>, f : Ap<B>) : Ap<A> =>
  liftApF(apE_(val, f))

const mapPatchA = <A,B>(pa : PatchA<A>, f : (a : A) => B) : PatchA<B> =>
  patch_(f(pa.newVal))

const compose = <A,B,C>(g : (b : B) => C) => (f : (a : A) => B) => (a :A) : C =>
  g(f(a))

const uncurry = <A,B,C>(f : (a : A) => (b : B) => C) => (args : [A, B]) : C =>
  f(args[0])(args[1])

const mapApF = <A,B,C>(x : ApF<A,C>, f : (a : A) => B) : ApF<B,C> =>
    x._tag == "Pure" ? pure_(f(x.val))
  : apE_(mapPatchA(x.val, compose(f)), x.apB)

const mapAp = <A,B>(a : Ap<A>, f : (a : A) => B) : Ap<B> =>
  a(<X>(x : ApF<A,X>) => liftApF(mapApF(x,f)))

const pairAp = <A, B>(a: Ap<A>, b: Ap<B>): Ap<[A, B]> =>
    ap(b, mapAp(a, (x : A) => (y : B) => [x,y]))

const ap = <A,B>(aa : Ap<A>, ff : Ap<(a : A) => B>) : Ap<B> => 
  ff(<D>(f : ApF<(a : A) => B, D>) =>
      f._tag == "Pure" ? mapAp(aa, f.val)
    : apE(mapPatchA(f.val, uncurry), pairAp(f.apB, aa))
  )
