foo?.();
foo?.("foo");
foo?.("foo", "bar");
foo?.(bar());
foo?.(bar("test"));
foo(bar?.());
foo(bar?.("test"));

a.foo?.();
a.foo?.("foo");
a.foo?.("foo", "bar");
a.foo?.(bar());
a.foo?.(bar("test"));
a.foo(bar?.());
a.foo(bar?.("test"));

a?.foo?.();
a?.foo?.("foo");
a?.foo?.("foo", "bar");
a?.foo?.(bar());
a?.foo?.(bar("test"));
a?.foo(bar?.());
a?.foo(bar?.("test"));

a.foo?.().baz;
a.foo?.("foo").baz;
a.foo?.("foo", "bar").baz;
a.foo?.(bar()).baz;
a.foo?.(bar("test")).baz;
a.foo(bar?.()).baz;
a.foo(bar?.("test")).baz;

a.foo?.()?.baz;
a.foo?.("foo")?.baz;
a.foo?.("foo", "bar")?.baz;
a.foo?.(bar())?.baz;
a.foo?.(bar("test"))?.baz;
a.foo(bar?.())?.baz;
a.foo(bar?.("test"))?.baz;
