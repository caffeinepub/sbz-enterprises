import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type BookingInquiry = {
    companyName : Text;
    contactPerson : Text;
    country : Text;
    email : Text;
    phoneNumber : Text;
    quantityMT : Nat;
    destinationPort : Text;
    paymentTerms : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module BookingInquiry {
    public func compareByTimestamp(a : BookingInquiry, b : BookingInquiry) : Order.Order {
      if (a.timestamp < b.timestamp) { #less } else if (a.timestamp > b.timestamp) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  let inquiries = Map.empty<Time.Time, BookingInquiry>();

  public shared ({ caller }) func submitInquiry(
    companyName : Text,
    contactPerson : Text,
    country : Text,
    email : Text,
    phoneNumber : Text,
    quantityMT : Nat,
    destinationPort : Text,
    paymentTerms : ?Text,
    message : Text,
  ) : async () {
    let timestamp = Time.now();
    if (inquiries.containsKey(timestamp)) {
      Runtime.trap("Duplicate timestamp, please resubmit inquiry");
    };

    let inquiry : BookingInquiry = {
      companyName;
      contactPerson;
      country;
      email;
      phoneNumber;
      quantityMT;
      destinationPort;
      paymentTerms = switch (paymentTerms) {
        case (null) { "LC at Sight" };
        case (?terms) { terms };
      };
      message;
      timestamp;
    };
    inquiries.add(timestamp, inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [BookingInquiry] {
    inquiries.values().toArray().sort(BookingInquiry.compareByTimestamp);
  };
};
