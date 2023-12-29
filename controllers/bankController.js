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

// @des      Deposits cash in bank
// @route    PUT /api/v1/bank/deposit-cash/:id?cash=[cash value]
// @access   Public
export function depositCash(req, res, next) {
  try {
    const data = readFromBankFile();
    const index = data.findIndex((user) => user.id === req.params.id);
    if (index === -1) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User with this ID doesn't exist");
    }

    if (+req.query.cash < 0) {
      res.status(STATUS_CODE.FORBIDDEN);
      throw new Error("Cant deposit negative cash!");
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

// @des      Updates user's credit
// @route    PUT /api/v1/bank/:id?credit=[credit value]
// @access   Public
export function updateUserCredit(req, res, next) {
  try {
    const data = readFromBankFile();
    const index = data.findIndex((user) => user.id === req.params.id);
    if (index === -1) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User with this id is not found");
    }

    if (req.query.credit < 0) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Failed to add credit , only positive credits allowed!");
    }

    const updatedUser = {
      ...data[index],
      credit: +req.query.credit,
    };
    data[index] = updatedUser;
    writeToBankFile(data);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
}

// @des      Withdraws money from the bank
// @route    PUT /api/v1/bank/withdraw/:id
// @access   Public
export function withdrawMoney(req, res, next) {
  try {
    const data = readFromBankFile();
    const index = data.findIndex((user) => user.id === req.params.id);
    if (index === -1) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User with this ID doesn't exist");
    }

    const prevCash = data[index].cash;
    const prevCredit = data[index].credit;

    if (+req.query.money > +prevCash + +prevCredit) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("You don't have that amount of money to withdraw.");
    }
    if (+prevCash > +req.query.money) {
      const updatedUser = {
        ...data[index],
        cash: +prevCash - +req.query.money,
      };
      data[index] = updatedUser;
      writeToBankFile(data);
      res.send(updatedUser);
    }

    if (+req.query.money > +prevCash) {
      const updatedUser = {
        ...data[index],
        cash: 0,
        credit: +prevCredit - (+req.query.money - +prevCash),
      };
      data[index] = updatedUser;
      writeToBankFile(data);
      res.send(updatedUser);
    }
  } catch (error) {
    next(error);
  }
}

// @des      Transfers money from one user to another [money goes to credit]
// @route    PUT /api/v1/bank/transfer/:recipientId/from/:senderId?money=[value]
// @access   Public
export function transferMoney(req, res, next) {
  try {
    const data = readFromBankFile();
    const senderIndex = data.findIndex(
      (user) => user.id === req.params.senderId
    );
    const recipientIndex = data.findIndex(
      (user) => user.id === req.params.recipientId
    );
    if (senderIndex === -1 || recipientIndex === -1) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("The sender or the recipient does not exist.");
    }

    const senderPrevCash = data[senderIndex].cash;
    const senderPrevCredit = data[senderIndex].credit;

    const recipientPrevCredit = data[recipientIndex].credit;

    if (+req.query.money > +senderPrevCash + +senderPrevCredit) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("You don't have that amount of money to transfer.");
    }
    if (+senderPrevCash > +req.query.money) {
      const updatedSenderUser = {
        ...data[senderIndex],
        cash: +senderPrevCash - +req.query.money,
      };
      data[senderIndex] = updatedSenderUser;

      const updatedRecipientUser = {
        ...data[recipientIndex],
        credit: +recipientPrevCredit + +req.query.money,
      };
      data[recipientIndex] = updatedRecipientUser;

      writeToBankFile(data);
      res.send(updatedSenderUser);
      res.send(updatedRecipientUser);
    }

    if (+req.query.money > +senderPrevCash) {
      const updatedSenderUser = {
        ...data[senderIndex],
        cash: 0,
        credit: +senderPrevCredit - (+req.query.money - +senderPrevCash),
      };
      data[senderIndex] = updatedSenderUser;

      const updatedRecipientUser = {
        ...data[recipientIndex],
        credit: +recipientPrevCredit + +req.query.money,
      };
      data[recipientIndex] = updatedRecipientUser;

      writeToBankFile(data);
      res.send(updatedSenderUser);
    }
  } catch (error) {
    next(error);
  }
}
