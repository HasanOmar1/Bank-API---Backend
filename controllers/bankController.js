import STATUS_CODE from "../constants/statusCode.js";
import { readFromBankFile, writeToBankFile } from "../models/bankModel.js";
import { v4 as uuidv4 } from "uuid";

// @des         Gets all Bank data
// @route       GET /api/v1/bank
// @access      Public
export function getBankData(req, res, next) {
  try {
    const data = readFromBankFile();
    res.send(data);
  } catch (error) {
    next(error);
  }
}

// @des      Creates new user
// @route    POST /api/v1/bank
// @access   Public
export function createUser(req, res, next) {
  try {
    const { name, cash, credit } = req.body;
    if (!name || cash === undefined || credit === undefined) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("All fields must be filled!");
    }

    const data = readFromBankFile();
    const findUser = data.some((user) => user.name === name);
    if (findUser) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("User with this name already exists!");
    }

    const newUser = { id: uuidv4(), name, cash, credit };
    data.push(newUser);
    writeToBankFile(data);
    res.status(STATUS_CODE.CREATED).send(newUser);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST);
    next(error);
  }
}

// @des      Updates a user
// @route    PUT /api/v1/bank/:id
// @access   Public
export function updateUser(req, res, next) {
  try {
    const { name, cash, credit } = req.body;
    if (!name || cash === undefined || credit === undefined) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("All fields must be filled!");
    }
    const data = readFromBankFile();

    const index = data.findIndex((user) => user.id === req.params.id);
    if (index === -1) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User with this id is not found");
    }

    const lastIndex = data.findLastIndex((user) => user.name === name);
    if (lastIndex !== -1 && lastIndex !== index) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error(
        "Failed to update user , user with this name already exists"
      );
    }

    const updatedUser = { ...data[index], name, cash, credit };
    data[index] = updatedUser;
    writeToBankFile(data);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
}

// @des      Deletes a user
// @route    DELETE /api/v1/bank/:id
// @access   Public
export function deleteUser(req, res, next) {
  try {
    const data = readFromBankFile();
    const newData = data.filter((user) => user.id !== req.params.id);
    if (newData.length === data.length) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User with this ID is not found");
    }
    writeToBankFile(newData);
    res
      .status(STATUS_CODE.OK)
      .send(`User with the ID of ${req.params.id} has been deleted`);
  } catch (error) {
    next(error);
  }
}

// @des      Gets user info by id
// @route    GET /api/v1/bank/:id
// @access   Public
export function getUserById(req, res, next) {
  try {
    const data = readFromBankFile();
    const findUser = data.find((user) => user.id === req.params.id);
    if (!findUser) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error(`User with the id of ${req.params.id} does not exist`);
    }
    res.send(findUser);
  } catch (error) {
    next(error);
  }
}

// @des      Deposits cash to a user by id
// @route    PUT /api/v1/bank/deposit/:id
// @access   Public
export function depositCash(req, res, next) {
  try {
    const data = readFromBankFile();
    const index = data.findIndex((user) => user.id === req.params.id);
    if (index === -1) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User with this ID doesn't exist");
    }

    const prevCash = data[index].cash;

    const updatedUser = {
      ...data[index],
      cash: +prevCash + +req.query.cash,
    };
    data[index] = updatedUser;
    writeToBankFile(data);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
}
