import {
  AuctionCancelled as AuctionCancelledEvent,
  AuctionCreated as AuctionCreatedEvent,
  BidPlaced as BidPlacedEvent,
  NFTClaimed as NFTClaimedEvent
} from "../generated/FHEEmelMarket/FHEEmelMarket";
import { Auction } from "../generated/schema";
    

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  let id = event.address.toHexString() + "-" + event.params.auctionId.toString();
  
  let entity = new Auction(id);
  entity.auctionId = event.params.auctionId
  entity.nftCA = event.params.nftCA
  entity.tokenId = event.params.tokenId
  entity.seller = event.params.seller
  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.status = "AUCTIONED"

  entity.save()

}

export function handleBidPlaced(event: BidPlacedEvent): void {
  let id = event.address.toHexString() + "-" + event.params.auctionId.toString();
  let auction = Auction.load(id);
  // if auction exists
  if(auction) {
    auction.blockTimestamp = event.block.timestamp
    auction.transactionHash = event.transaction.hash
    auction.status = "BID"

    auction.save()
  }
  
}

export function handleAuctionCancelled(event: AuctionCancelledEvent): void {
  let id = event.address.toHexString() + "-" + event.params.auctionId.toString();
  let auction = Auction.load(id);
  // if auction exists
  if(auction) {
    auction.blockTimestamp = event.block.timestamp
    auction.transactionHash = event.transaction.hash
    auction.status = "CANCELLED"

    auction.save()
  }
  
}

export function handleNFTClaimed(event: NFTClaimedEvent): void {
  let id = event.address.toHexString() + "-" + event.params.auctionId.toString();
  let auction = Auction.load(id);
  // if auction exists
  if(auction) {
    auction.blockTimestamp = event.block.timestamp
    auction.transactionHash = event.transaction.hash
    auction.status = "SOLD"

    auction.save()
  }
  
}

