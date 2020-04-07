# Swapper

Swapper is a tool that takes lists of words and uses those lists to populate strings (re)using items from those lists.

## Swap Lists

Swap Lists are the heart of Swapper. Swap Lists are Javascript or JSON objects who's properties refer to the category names to be used with swapper. The following is a valid Swap List

```javascript
{
  person: ["Joe", "Molly"];
}
```

"person" in this swap list is offically a Swap Category.

## Swap Identifiers

Swap Identifiers tell Swapper what to swap. They are special bracketed markup containing a Swap Category and a number to disitinguish it, such as `[person1]`. Swap identifiers can be reused in strings. There must be at least one Swap Identifier in every string.

## Swap Groups

Swap Groups work similarly to Swap Categories, except that they (should) refer to Swap Categories. Swap Groups can be used in identifiers just like Swap Categories. To specify a swap group, prefix the group name with "sg:"
