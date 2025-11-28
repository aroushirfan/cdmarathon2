# Explanation of the Code


```js
jobSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

So this code basically changes how our job data looks when we send it back to the frontend. Normally MongoDB gives us fields like `_id` and `__v`, which don’t look very nice and aren’t really useful for the client. What the code does is it takes the `_id` field and copies it into a new field called `id`, then it deletes the original `_id` and also removes `__v` so they don’t show up in the JSON response. The `virtuals: true` part just makes sure that extra fields like `id` are included when the object is turned into JSON. In simple words, this is just a cleanup step so that when the frontend gets job data, it sees a neat `id` instead of `_id`, and doesn’t have to deal with extra database stuff like `__v`.
