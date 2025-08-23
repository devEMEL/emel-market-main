import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AuctionCancelled,
  AuctionCreated,
  AuctionResolved,
  BidPlaced,
  DecryptionFulfilled,
  NFTClaimed
} from "../generated/FHEEmelMarket/FHEEmelMarket"

export function createAuctionCancelledEvent(
  auctionId: BigInt
): AuctionCancelled {
  let auctionCancelledEvent = changetype<AuctionCancelled>(newMockEvent())

  auctionCancelledEvent.parameters = new Array()

  auctionCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId)
    )
  )

  return auctionCancelledEvent
}

export function createAuctionCreatedEvent(
  auctionId: BigInt,
  nftCA: Address,
  tokenId: BigInt,
  seller: Address,
  startTime: BigInt,
  endTime: BigInt
): AuctionCreated {
  let auctionCreatedEvent = changetype<AuctionCreated>(newMockEvent())

  auctionCreatedEvent.parameters = new Array()

  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("nftCA", ethereum.Value.fromAddress(nftCA))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )

  return auctionCreatedEvent
}

export function createAuctionResolvedEvent(
  auctionId: BigInt,
  winner: Address
): AuctionResolved {
  let auctionResolvedEvent = changetype<AuctionResolved>(newMockEvent())

  auctionResolvedEvent.parameters = new Array()

  auctionResolvedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId)
    )
  )
  auctionResolvedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )

  return auctionResolvedEvent
}

export function createBidPlacedEvent(
  auctionId: BigInt,
  bidder: Address
): BidPlaced {
  let bidPlacedEvent = changetype<BidPlaced>(newMockEvent())

  bidPlacedEvent.parameters = new Array()

  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )

  return bidPlacedEvent
}

export function createDecryptionFulfilledEvent(
  requestID: BigInt
): DecryptionFulfilled {
  let decryptionFulfilledEvent = changetype<DecryptionFulfilled>(newMockEvent())

  decryptionFulfilledEvent.parameters = new Array()

  decryptionFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "requestID",
      ethereum.Value.fromUnsignedBigInt(requestID)
    )
  )

  return decryptionFulfilledEvent
}

export function createNFTClaimedEvent(
  auctionId: BigInt,
  winner: Address
): NFTClaimed {
  let nftClaimedEvent = changetype<NFTClaimed>(newMockEvent())

  nftClaimedEvent.parameters = new Array()

  nftClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId)
    )
  )
  nftClaimedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )

  return nftClaimedEvent
}
