vec = u => typeof u === "number" ? [ u, u ] : u;
add = (u, v) => { v = vec(v); return [ u[0] + v[0], u[1] + v[1] ]; };
sub = (u, v) => { v = vec(v); return [ u[0] - v[0], u[1] - v[1] ]; };
mul = (u, v) => { v = vec(v); return [ u[0] * v[0], u[1] * v[1] ]; };
div = (u, v) => { v = vec(v); return [ u[0] / v[0], u[1] / v[1] ]; };
dot = (u, v) => u[0]*v[0] + u[1]*v[1];
norm = u => Math.sqrt(dot(u, u));
normalize = u => div(u, norm(u));
dist = (u, v) => norm(sub(u, v));