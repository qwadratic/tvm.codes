import React from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import HomeLayout from 'components/layouts/Home'
import {
  Container,
  H1,
  H2,
  H3,
  Icon,
  // RelativeLink
} from 'components/ui'
// import { Pre } from 'components/ui/Doc'

type SectionWrapperProps = {
  header: React.ReactNode
  anchorKey: string
  children: React.ReactNode
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  header,
  anchorKey,
  children,
}) => {
  return (
    <>
      <html lang="en"></html>
      <React.Fragment>
        <Head>
          <title>TVM Codes - About TVM </title>
        </Head>
        <meta
          property="og:description"
          content="How does the TVM work? We explain the relationship between opcode
          instructions, gas costs, storage and the execution environment for
          your understanding."
        />
      </React.Fragment>
      <div
        id={anchorKey}
        className="font-mono mb-4 justify-start relative items-center scroll-mt-14"
      >
        <Link href={`/about#${anchorKey}`}>
          <a className="absolute -left-6">
            <Icon name="links-line" className="text-indigo-500" />
          </a>
        </Link>

        {header}
      </div>
      <div>{children}</div>
    </>
  )
}

// NOTE: It seems the memory expansion computation and constants did not change
// since frontier, but we have to keep an eye on new fork to keep this up to date
const AboutPage = () => {
  return (
    <Container className="text-sm leading-6 max-w-4xl">
      <H1>About the TVM</H1>
      <div className="caution-box">
        <p>"TVM" abbreviation stands for Threaded Virtual Machine</p>
      </div>
      <br />
      <SectionWrapper header={<H2>Introduction</H2>} anchorKey="introduction">
        <p className="pb-6">
          <H3>What is TVM?</H3>
          The primary purpose of the TVM is to execute smart-contract code in
          the TVM-based Blockchains. TVM must support all operations required to
          parse incoming messages and persistent data, and to create new
          messages and modify persistent data. Now TVM is used to execute
          smart-contract code in the masterchain (-1 workchain) and in the
          basechain (0 workchain). Other workchains may use other virtual
          machines alongside or instead of the TVM. The stack principle forms
          the foundation of TVM, ensuring its efficiency and ease of
          implementation. TVM also provides a variety of primitives for working
          with native data types for the TVM-based Blockchains, such as TVM
          Cells. More information about the structure and operation principles
          of TVM can be found here{' '}
          <a href="https://docs.everscale.network/tvm.pdf">tvm.pdf</a> is the
          original document designed by Nikolai Durov and modified by the
          Everscale Team to take into account the current changes in TVM in the
          Everscale blockchain. For further information consider reaching out to
          <a
            href="https://tonlabs.notion.site/tonlabs/TVM-Extended-Instructions-f22fb9a10bec4f8cadd9757e7d6df51d"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            TVM Extended Instructions
          </a>
          . The blockchains that are using TVM are currently the Venom,
          Everscale, Gosh and TON.
        </p>
        <p className="pb-8">
          <H3>What is a smart contract?</H3>A smart contract is a set of
          instructions. Each instruction is an opcode (with their own handy
          mnemonic for reference, text representations of their assigned
          values). The smart contracts in these blockchains are written in the
          solidity dialect called T-Sol.
          <H3>Accounts</H3>
          <p>
            In Ethereum, accounts can be externally owned (controlled by anyone
            with private keys) or implemented as smart contracts. However, there
            is no distinction between accounts and smart contracts in the
            TVM-based blockchains. Every account is a smart contract with code,
            and there is no concept of an externally-owned account (owned by key
            pair) in the traditional sense. All accounts can hold a balance,
            perform code, and send messages to each other. This approach is
            called Account Abstraction and allows for authentication through
            other means beyond external ownership. Since every account in the
            TVM-based blockchains is a smart contract, the contract's code can
            include any authentication logic necessary to verify a user's
            identity. The flexibility of smart contract code allows for a wide
            range of authentication options beyond traditional private key
            ownership.
          </p>
        </p>
      </SectionWrapper>

      <SectionWrapper
        header={<H2>Messages and Transactions</H2>}
        anchorKey="introduction"
      >
        <p className="pb-6">
          <H3>Messages</H3>
          In TVM-based networks, messages are used for communication between
          accounts. Messages trigger transactions that modify the state of the
          receiving account. They contain instructions for executing smart
          contracts and consist of a header (sender/receiver details) and a body
          (the method to execute along with params). Messages enable
          decentralized communication, data exchange, and actions among accounts
          in the network.
          <br />
          <H3>Transactions</H3>A transaction is a direct result of the
          processing of exactly one inbound message by a recipient account code.
          When an inbound message is received by an account, it leads to the
          computation of the account's new state and the possibility of
          generating one or more outbound messages with the account serving as
          the source. The inbound message and the previous state of the account
          serve as inputs for the transaction, while the generated outbound
          messages and the next state of the account serve as outputs. This
          relation can be represented as a Directed Acyclic Graph (DAG). For
          further information see{' '}
          <a href="https://docs.venom.foundation/learn/messages-and-transactions">
            Venom Docs
          </a>
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H2>Execution</H2>} anchorKey="executionenv">
        <H3>Transaction executor</H3>
        <p className="pb-8">
          Transaction Executor is a crucial part of tvm based blockchains nodes.
          It applies incoming messages to accounts, sealing the end result of
          this operation into a block in the form of a transaction object.
        </p>
        <H3>Smart contract executer</H3>
        <p className="pb-8">
          Before executing any contract function and creating a transaction, the
          special code is executed. In *.code file there are two special
          functions: main_internal and main_external that run on internal and
          external messages respectively. These functions initialize some
          internal global variables and call contract function of special
          function like receive, fallback, onBounce, etc.
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H3>The Code</H3>} anchorKey="code">
        <p className="pb-8">
          The code is the region where instructions are stored. Instruction data
          stored in the code is persistent as part of a contract account state
          field. Code is the bytes read, interpreted, and executed by the TVM
          during smart contract execution. Code can be upgraded if its written
          in a way to allow the upgrade.
        </p>
      </SectionWrapper>

      {/* <SectionWrapper header={<H3>The Program Counter</H3>} anchorKey="counter">
        <p className="pb-8">
          The Program Counter (PC) encodes which instruction, stored in the
          code, should be next read by the TVM. The program counter is usually
          incremented by one byte, to point to the following instruction, with
          some exceptions. For instance, the{' '}
          <RelativeLink to="#60" title="PUSHx" /> instruction is longer than a
          single byte, and causes the PC to skip their parameter. The{' '}
          <RelativeLink to="#56" title="JMPX" /> instruction does not increase
          the PC's value, instead, it modifies the program counter to a position
          specified by the top of the stack.
        </p>
      </SectionWrapper> */}

      {/* <SectionWrapper header={<H3>The Stack</H3>} anchorKey="stack">
        <p className="pb-8">
          The stack is a list of 32-byte elements used to store smart contract
          instruction inputs and outputs. There is one stack created per call
          context, and it is destroyed when the call context ends. When a new
          value is put on the stack, it is put on top, and only the top values
          are used by the instructions. The stack currently has a maximum limit
          of 1024 values. All instructions interact with the stack, but it can
          be directly manipulated with instructions like{' '}
          <RelativeLink to="#60" title="PUSH1" />,{' '}
          <RelativeLink to="#50" title="POP" />,{' '}
          <RelativeLink to="#80" title="DUP1" />, or{' '}
          <RelativeLink to="#90" title="SWAP1" />.
        </p>
      </SectionWrapper> */}

      {/* <SectionWrapper header={<H3>The Memory</H3>} anchorKey="memory">
        <p className="pb-8">
          EVM memory is not persistent, and is destroyed at the end of the call
          context. At the start of a call context, memory is initialized to 0.
          Reading and Writing from memory is usually done with{' '}
          <RelativeLink to="#51" title="MLOAD" /> and{' '}
          <RelativeLink to="#52" title="MSTORE" /> instructions respectively,
          but can also be accessed by other instructions like{' '}
          <RelativeLink to="#F0" title="CREATE" /> or{' '}
          <RelativeLink to="#F3" title="EXTCODECOPY" />. We discuss{' '}
          <RelativeLink
            to="about#memoryexpansion"
            title="memory size calculations"
          />{' '}
          later in this document.
        </p>
      </SectionWrapper> */}

      {/* <SectionWrapper header={<H3>The Storage</H3>} anchorKey="storage">
        <p className="pb-8">
          Storage is a map of 32-byte slots to 32-byte values. Storage is the
          persistent memory of smart contracts: each value written by the
          contract is retained past the completion of a call, unless its value
          is changed to 0, or the <RelativeLink to="#FF" title="SELFDESTRUCT" />{' '}
          instruction is executed. Reading stored bytes from an unwritten key
          also returns 0. Each contract has its own storage, and cannot read or
          modify storage from another contract. Storage is read and written with
          instructions <RelativeLink to="#54" title="SLOAD" /> and{' '}
          <RelativeLink to="#55" title="SSTORE" />.
        </p>
      </SectionWrapper> */}

      {/* <SectionWrapper header={<H3>The calldata</H3>} anchorKey="calldata">
        <p className="pb-8">
          The calldata region is the data sent to a transaction as part of a
          smart contract transaction. For example, when creating a contract,
          calldata would be the constructor code of the new contract. Calldata
          is immutable, and can be read with instructions{' '}
          <RelativeLink to="#35" title="CALLDATALOAD" />,{' '}
          <RelativeLink to="#36" title="CALLDATASIZE" />, and{' '}
          <RelativeLink to="#37" title="CALLDATACOPY" />. It is important to
          note that when a contract executes an xCALL instruction, it also
          creates an internal transaction. As a result, when executing xCALL,
          there is a calldata region in the new context.
        </p>
      </SectionWrapper> */}

      {/* <SectionWrapper header={<H3>The return data</H3>} anchorKey="returndata">
        <p className="pb-8">
          The return data is the way a smart contract can return a value after a
          call. It can be set by contract calls through the{' '}
          <RelativeLink to="#F3" title="RETURN" /> and{' '}
          <RelativeLink to="#FD" title="REVERT" /> instructions, and can be read
          by the calling contract with{' '}
          <RelativeLink to="#3D" title="RETURNDATASIZE" /> and{' '}
          <RelativeLink to="#3E" title="RETURNDATACOPY" />.
        </p>
      </SectionWrapper> */}

      {/* <SectionWrapper header={<H2>Gas Costs</H2>} anchorKey="gascosts">
        <p className="pb-4">
          Each transaction on the Ethereum blockchain is vetted by a third-party
          validator, before it is added to the blockchain. These validators are
          compensated for conducting this vetting process, and adding
          transactions to the blockchain, with incentive fee payments. Fees vary
          from transaction to transaction, contingent on different variables for
          different forks. Some variables in calculating fees include:
          <ul className="list-disc mb-2">
            <br></br>
            <li>
              <b>Current price of one gas unit:</b> Gas, or gwei, is a
              denomination of Ethereum, used in fee payment. Gas prices vary
              over time, based on current demand for block space, measured in
              ETH per gas.
            </li>
            <br></br>
            <li>
              <b>Calldata size:</b> Each calldata byte costs gas, the larger the
              size of the transaction data, the higher the gas fees. Calldata
              costs 4 gas per byte equal to 0, and 16 gas for the others (64
              before the hardfork Istanbul).
            </li>
            <br></br>
            <li>
              {' '}
              <b>Intrinsic Gas</b>: Each transaction has an intrinsic cost of
              21000 gas. Creating a contract costs 32000 gas, on top of the
              transaction cost. Again: calldata costs 4 gas per byte equal to 0,
              and 16 gas for the others (64 before the hardfork <b>Istanbul</b>
              ). This cost is paid from the transaction before any opcode or
              transfer execution.
            </li>
            <br></br>
            <li>
              <b>Opcode Fixed Execution Cost</b> : Each opcode has a fixed cost
              to be paid upon execution, measured in gas. This cost is the same
              for all executions, though this is subject to change in new
              hardforks. See our{' '}
              <a
                href="https://www.evm.codes/"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                reference
              </a>{' '}
              to learn about the specific costs per opcode and fork.
            </li>
            <br></br>
            <li>
              {' '}
              <b>Opcode Dynamic Execution Cost:</b> Some instructions conduct
              more work than others, depending on their parameters. Because of
              this, on top of fixed costs, some instructions have dynamic costs.
              These dynamic costs are dependant on several factors (which vary
              from hardfork to hardfork). See our{' '}
              <a
                href="https://www.evm.codes/"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                reference
              </a>{' '}
              to learn about the specific computations per opcode and fork.
            </li>
          </ul>
        </p>
        <p className="pb-8">
          To get a complete estimation of the gas cost for your program, with
          your compiler options and specific state and inputs, use a tool like{' '}
          <a
            href="https://remix.ethereum.org/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Remix
          </a>{' '}
          or{' '}
          <a
            href="https://trufflesuite.com/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Truffle
          </a>
          .
        </p>
      </SectionWrapper> */}
      {/* <SectionWrapper
        header={<H3>Memory Expansion</H3>}
        anchorKey="memoryexpansion"
      >
        <p className="pb-6">
          During a smart contract execution, memory can be accessed with
          opcodes. When an offset is first accessed (either read or write),
          memory may trigger an expansion, which costs gas.
        </p>
        <p className="pb-6">
          Memory expansion may be triggered when the byte offset (modulo 32)
          accessed is bigger than previous offsets. If a larger offset trigger
          of memory expansion occurs, the cost of accessing the higher offset is
          computed and removed from the total gas available at the current call
          context.
        </p>

        <p className="pb-4">
          <p className="pb-4">
            The total cost for a given memory size is computed as follows:
          </p>
          <Pre>
            <code>
              memory_size_word = (memory_byte_size + 31) / 32
              <br />
              memory_cost = (memory_size_word ** 2) / 512 + (3 *
              memory_size_word)
            </code>
          </Pre>
        </p>

        <p className="pb-4">
          <p className="pb-4">
            When a memory expansion is triggered, only the additional bytes of
            memory must be paid for. Therefore, the cost of memory expansion for
            specific opcode is thus:
          </p>
          <Pre>
            <code>
              memory_expansion_cost = new_memory_cost - last_memory_cost
            </code>
          </Pre>
        </p>

        <p className="pb-8">
          The <code>memory_byte_size</code> can be obtained with opcode{' '}
          <RelativeLink to="#59" title="MSIZE" />. The cost of memory expansion
          triggered by <RelativeLink to="#59" title="MSIZE" /> grows
          quadratically, disincentivizing the overuse of memory by making higher
          offsets more costly. Any opcode that accesses memory may trigger an
          expansion (such as <RelativeLink to="#51" title="MLOAD" />,{' '}
          <RelativeLink to="#F3" title="RETURN" /> or{' '}
          <RelativeLink to="#37" title="CALLDATACOPY" />
          ). Use our <RelativeLink title="reference" /> to review which opcode
          is capable of accessing memory. Note that opcodes with a byte size
          parameter of 0 will not trigger memory expansion, regardless of their
          offset parameters.
        </p>
      </SectionWrapper> */}

      {/* <SectionWrapper header={<H3>Access Sets</H3>} anchorKey="accesssets">
        <p className="pb-6">
          Access sets are defined per external transaction, and not per call.
          Each transaction may be defined by some combination of its sender,
          calldata, or callee. Transactions can either be external or internal.
          External transactions are sent to the Ethereum network. Internal
          transactions are external transactions that have executed the xCALL
          instruction. As such, internal transactions are also known as calls.
          Access sets can be thought of as two independent types of lists: those
          of touch contract addresses, and those of touched contract storage
          slots.
        </p>
        <p className="pb-6">
          When an address is accessed by a transaction, instruction, or used as
          caller or callee, it is put in the access set. Calling the opcode{' '}
          <RelativeLink to="#31" title="BALANCE" />, on an address not present
          in an access set costs more than if the address were already in the
          set. Other opcodes that can modify the access set include{' '}
          <RelativeLink to="#3B" title="EXTCODESIZE" />,{' '}
          <RelativeLink to="#3C" title="EXTCODECOPY" />,{' '}
          <RelativeLink to="#3F" title="EXTCODEHASH" />,{' '}
          <RelativeLink to="#F1" title="CALL" />,{' '}
          <RelativeLink to="#F2" title="CALLCODE" />,{' '}
          <RelativeLink to="#F4" title="DELEGATECALL" />,{' '}
          <RelativeLink to="#FA" title="STATICCALL" />,{' '}
          <RelativeLink to="#F0" title="CREATE" />,{' '}
          <RelativeLink to="#F5" title="CREATE2" /> and{' '}
          <RelativeLink to="#FF" title="SELFDESTRUCT" />. Each opcode has their
          own cost when modifying the access set.
        </p>
        <p className="pb-6">
          Touch slot lists are a set of storage slot keys accessed by contract
          addresses. Slot lists are initialized to empty. When an opcode
          accesses a slot that is not present in the set, it adds it to it.
          Opcodes that can modify the touched slot list are{' '}
          <RelativeLink to="#54" title="SLOAD" /> and{' '}
          <RelativeLink to="#55" title="SSTORE" />. Again, both opcodes have
          their own cost when modifying the access set.
        </p>
        <p className="pb-6">
          If a context is reverted, sets are reverted to their state before the
          context.
        </p>
        <p className="pb-8">
          If an address or storage slot is present in the set, it is called
          'warm'; otherwise it is 'cold'. Storage slots that are touched for the
          first time in a transaction change from cold to warm for the duration
          of the transaction. Transactions can pre-specify contracts as warm.
          The dynamic cost of some opcodes depend on whether an address or slot
          is warm or cold. After the hardfork <b>Berlin</b>, all precompiled
          contract addresses are always ‘warm’.
        </p>
      </SectionWrapper> */}

      {/* <SectionWrapper header={<H3>Gas Refunds</H3>} anchorKey="gasrefunds">
        <p className="pb-8">
          Some opcodes can trigger gas refunds, which reduces the gas cost of a
          transaction. Gas refunds are applied at the end of a transaction. If a
          transaction has insufficient gas to reach the end of its run, its gas
          refund cannot not be triggered, and the transaction fails. With the
          introduction of the <b>London</b> hardfork, two aspects of gas refunds
          changed. First, the limit to how much gas can be refunded is lowered
          from half of the total transaction cost, to one fifth of the total
          transaction cost. Second, the{' '}
          <RelativeLink to="#FF" title="SELFDESTRUCT" /> opcode cannot trigger
          gas refunds, only <RelativeLink to="#55" title="SSTORE" />.
        </p>
      </SectionWrapper> */}

      {/* <SectionWrapper
        header={<H2>Other EVM Related Resources</H2>}
        anchorKey="otherevmresources"
      >
        <p className="pb-8">
          <a
            href="https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Ethereum EVM Illustrated (2018)
          </a>
          ,{' '}
          <a
            href="https://ethereum.org/en/history/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            The History and Forks of Ethereum
          </a>
          ,{' '}
          <a
            href="https://www.youtube.com/watch?v=RxL_1AfV7N4&t=1s"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            EVM: From Solidity to bytecode, memory and storage
          </a>
          ,{' '}
          <a
            href="https://noxx.substack.com/p/evm-deep-dives-the-path-to-shadowy"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            EVM Deep Dives by noxx
          </a>
          ,{' '}
          <a
            href="https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            The EVM Chapter in the Mastering Ethereum book
          </a>
        </p>

        <em>
          <p>
            Acknowledgment to{' '}
            <a
              href="https://github.com/wolflo/evm-opcodes"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              wolflo
            </a>{' '}
            for the cost descriptions.{' '}
          </p>
          <p>
            Check out{' '}
            <a
              href="https://blog.smlxl.io/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              our blog
            </a>{' '}
            for more writeups about the EVM, and other blockchain concepts.
          </p>
        </em>
      </SectionWrapper> */}
    </Container>
  )
}

AboutPage.getLayout = function getLayout(page: NextPage) {
  return <HomeLayout>{page}</HomeLayout>
}

export default AboutPage
