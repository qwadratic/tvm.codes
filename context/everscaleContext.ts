import { TvmOpcodeStructure } from '../types/index'
import React, { createContext, useEffect, useState, useRef } from 'react'
import { ContextProps, initialExecutionState } from './ethereumContext'
export class Opcode {
  readonly code: string
  readonly name: string
  readonly fullName: string
  readonly fee: number
  readonly isAsync: boolean
  readonly dynamicGas: boolean

  constructor({
    code,
    name,
    fullName,
    fee,
    isAsync,
    dynamicGas,
  }: {
    code: string
    name: string
    fullName: string
    fee: number
    isAsync: boolean
    dynamicGas: boolean
  }) {
    this.code = code
    this.name = name
    this.fullName = fullName
    this.fee = fee
    this.isAsync = isAsync
    this.dynamicGas = dynamicGas

    // Opcode isn't subject to change, thus all further modifications are prevented.
    Object.freeze(this)
  }
}
type OpcodeList = Map<string, Opcode>
const jsonData = require('../opcodes.json')
export class OpcodeData {
  names: string[]
  aliasOfs: string[]
  tlbs: string[]
  Categories: string[]
  opcodes: string[]
  Fifts: string[]
  stacks: string[]
  inputs: string[]
  outputs: string[]
  gases: string[]
  descriptions: string[]
  jsonData: { [key: string]: TvmOpcodeStructure }

  constructor() {
    this.jsonData = jsonData
    let tempJson = Object.entries(this.jsonData)
    this.names = tempJson.map((key) => key[1].name)
    this.aliasOfs = tempJson.map((key) => key[1].alias_of)
    this.tlbs = tempJson.map((key) => key[1].tlb)
    this.Categories = tempJson.map((key) => key[1].category)
    this.opcodes = tempJson.map((key) => key[1].opcode)
    this.Fifts = tempJson.map((key) => key[1].fift)
    this.inputs = tempJson.map((key) => key[1].input)
    this.outputs = tempJson.map((key) => key[1].output)
    this.stacks = tempJson.map((key) => key[1].stack)
    this.gases = tempJson.map((key) => key[1].gas)
    this.descriptions = tempJson.map((key) => key[1].description)
  }

  getAllOpcodes(): OpcodeList {
    const opcodes: OpcodeList = new Map()
    this.opcodes.forEach((opcode, index) => {
      let tempOpcode = new Opcode({
        code: opcode,
        name: this.getNameByOpcode(opcode.toString())!,
        fullName: this.getNameByOpcode(opcode.toString())!,
        fee: Number(this.getGasValueByOpcode(opcode.toString())),
        isAsync: false,
        dynamicGas: false,
      })
      console.log(tempOpcode)
      opcodes.set(opcode, tempOpcode)
    })
    return opcodes
  }

  getAllNames(): string[] {
    return this.names
  }

  getNameByOpcode(opcode: string): string | undefined {
    return this.jsonData[opcode].name
  }

  getAllAliasOfs(): string[] {
    return this.aliasOfs
  }

  getAliasOfByOpcode(opcode: string): string | undefined {
    return this.jsonData[opcode].alias_of
  }
  getAllDescriptions(): string[] {
    return this.descriptions
  }

  getDescriptionByOpcode(opcode: string): string | undefined {
    return this.jsonData[opcode].description
  }

  getAllTlbs(): string[] {
    return this.tlbs
  }

  getTlbByOpcode(opcode: string): string | undefined {
    return this.jsonData[opcode].tlb
  }

  getAllCategories(): string[] {
    return this.Categories
  }

  getDocCategoryByOpcode(opcode: string): string | undefined {
    return this.jsonData[opcode].category
  }

  getAllFifts(): string[] {
    return this.Fifts
  }

  getDocFiftByOpcode(opcode: string): string | undefined {
    return this.jsonData[opcode].fift
  }

  getAllIn_Outputs(): string[] {
    return this.stacks
  }

  getIn_OutputsByOpcode(opcode: string): string | undefined {
    return this.jsonData[opcode].stack
  }

  getAllGasValues(): string[] {
    return this.gases
  }

  getGasValueByOpcode(opcode: string): string | undefined {
    return this.jsonData[opcode].gas
  }
}
// export const EverscaleContext = createContext<ContextProps>({
//   common: undefined,
//   chains: [],
//   forks: [],
//   selectedChain: undefined,
//   selectedFork: undefined,
//   opcodes: [],
//   precompiled: [],
//   instructions: [],
//   deployedContractAddress: undefined,
//   isExecuting: false,
//   executionState: initialExecutionState,
//   vmError: undefined,

//   onChainChange: () => undefined,
//   onForkChange: () => undefined,
//   transactionData: () =>
//     new Promise((resolve) => {
//       resolve({})
//     }),
//   loadInstructions: () => undefined,
//   startExecution: () => undefined,
//   startTransaction: () => Promise.reject(),
//   continueExecution: () => undefined,
//   addBreakpoint: () => undefined,
//   removeBreakpoint: () => undefined,
//   nextExecution: () => undefined,
//   resetExecution: () => undefined,
// })
