import { Model } from 'mongoose';

async function updateSchema(model: Model<any>, newFieldName: string, fieldDefaultValue: any) {
  try {
    const result = await model.updateMany({}, { $set: { [newFieldName]: fieldDefaultValue } });
    console.log(`${result.modifiedCount} documents updated`);
  } catch (err) {
    console.log(err);
  }
}
