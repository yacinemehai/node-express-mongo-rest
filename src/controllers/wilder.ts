import WilderModel from "../models/Wilder";
import {Request, Response} from "express";

export default {
  create: async (req:Request, res:Response) => {
    await WilderModel.init();
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.json({ success: true, result });
  },
  read: async (req:Request, res:Response) => {
    const result = await WilderModel.find();
    res.json({ success: true, result });
  },
  update: async (req:Request, res:Response) => {
    const result = await WilderModel.updateOne({ _id: req.body._id }, req.body);
    res.json(result);
  },
  delete: async (req:Request, res:Response) => {
    const result = await WilderModel.deleteOne({ _id: req.params.id });
    res.json({ success: true, result });
  },
};
