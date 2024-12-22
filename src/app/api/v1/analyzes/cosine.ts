export function sum_product(vars: {
  vector1: Array<number>;
  vector2: Array<number>;
}): number {
  return vars.vector1.reduce(
    (acc, value, index) => acc + value * vars.vector2[index],
    0
  );
}

export function magnitude(vars: { vector: Array<number> }): number {
  return Math.sqrt(vars.vector.reduce((acc, value) => acc + value * value, 0));
}

export function cosine_similarity(vars: {
  vector1: Array<number>;
  vector2: Array<number>;
}): number {
  return (
    sum_product({ vector1: vars.vector1, vector2: vars.vector2 }) /
    (magnitude({ vector: vars.vector1 }) * magnitude({ vector: vars.vector2 }))
  );
}

export function cosine(vars: {
  vector1: Array<number>;
  vector2: Array<number>;
}): number {
  return cosine_similarity({ vector1: vars.vector1, vector2: vars.vector2 });
}
