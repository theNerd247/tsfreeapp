//const liftApF = <A,B>(apF : ApF<A,B>) : Ap<A> => 
//  <R>(cont : <X>(t : ApF<A,X>) => R) => cont(apF)
//
//const asConst = <A>(a : A) => <B=never>(b : B) : A => a
//
//const pure = <A>(a : A) : Ap<A> => 
//  liftApF(pure_(a))
//
//const apE = <A,B>(val : PatchA<(b : B) => A>, f : Ap<B>) : Ap<A> =>
//  liftApF(apE_(val, f))
//
//const liftPatch = <A>(p : PatchA<A>) : Ap<A> =>
//  apE(mapPatchA(p, asConst), pure(null))
//
//const compose = <A,B,C>(g : (b : B) => C) => (f : (a : A) => B) => (a :A) : C =>
//  g(f(a))
//
//const uncurry = <A,B,C>(f : (a : A) => (b : B) => C) => (args : [A, B]) : C =>
//  f(args[0])(args[1])
//
//const mapApF = <A,B,C>(x : ApF<A,C>, f : (a : A) => B) : ApF<B,C> =>
//    x._tag == "Pure" ? pure_(f(x.val))
//  : apE_(mapPatchA(x.val, compose(f)), x.apB)
//
//const mapAp = <A,B>(a : Ap<A>, f : (a : A) => B) : Ap<B> =>
//  a(<X>(x : ApF<A,X>) => liftApF(mapApF(x,f)))
//
//const pairAp = <A, B>(a: Ap<A>, b: Ap<B>): Ap<[A, B]> =>
//    ap(b, mapAp(a, (x : A) => (y : B) => [x,y]))
//
//const ap = <A,B>(aa : Ap<A>, ff : Ap<(a : A) => B>) : Ap<B> => 
//  ff(<D>(f : ApF<(a : A) => B, D>) =>
//      f._tag == "Pure" ? mapAp(aa, f.val)
//    : apE(mapPatchA(f.val, uncurry), pairAp(f.apB, aa))
//  )
//
//// Currently this is not implementable as our functor (PatchA) is the identity
//// functor. The free applicative of the identity functor is 
////
////const patchToString = <A>(ap : Ap<A>) : string =>
////  ap(<B>(a : ApF<A,B>) =>
////    a._tag == "Pure" ? ""
////    :                  a.
////  )
//
//interface Foo
//  { x : string
//  , y : number
//  , z : boolean
//  }
//
//const patch = <A>(newVal : A) : Ap<A> => 
//  liftPatch(patchV_(newVal))
//
//const patchWith = <A,B>(newVal : A, f : (a : A) => B) : Ap<B> =>
//  mapAp(patch(newVal), f)
//
//const patchStr : (newVal : string) =>   Ap<string>  = patch
//const patchNum : (newVal : number) =>   Ap<number>  = patch
//const patchBool : (newVal : boolean) => Ap<boolean> = patch
//
//const patchX = (newVal : string) : Ap<{ x : string }> =>
//  patchWith(newVal, (x) => ({ x }))
