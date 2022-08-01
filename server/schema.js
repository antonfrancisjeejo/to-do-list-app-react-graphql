const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} = require("graphql");
let { items } = require("./data");

const ItemInputType = new GraphQLInputObjectType({
  name: "ItemInput",
  fields: {
    data: { type: GraphQLString },
  },
});

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: {
    name: { type: GraphQLString },
  },
});

const query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    items: {
      type: new GraphQLList(ItemType),
      resolve: () => {
        return items;
      },
    },
  },
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addItem: {
      type: new GraphQLList(ItemType),
      args: {
        input: {
          type: ItemInputType,
        },
      },
      resolve: (source, args) => {
        items.push({ name: args.input.data });
        console.log(items);
        return items;
      },
    },
    deleteItem: {
      type: new GraphQLList(ItemType),
      args: { id: { type: GraphQLInt } },
      resolve: (source, args) => {
        items = items.filter((_, index) => index !== args.id);
        return items;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query,
  mutation: mutationType,
});

module.exports = schema;
