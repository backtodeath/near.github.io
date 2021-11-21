//! This contract implements simple counter backed by storage on blockchain.
//!
//! The contract provides methods to [increment] / [decrement] counter and
//! [get it's current value][get_num] or [reset].
//!
//! [increment]: struct.Counter.html#method.increment
//! [decrement]: struct.Counter.html#method.decrement
//! [get_num]: struct.Counter.html#method.get_num
//! [reset]: struct.Counter.html#method.reset

use near_sdk::{env, near_bindgen};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Visitor {
    previous_visitor: std::string::String,
    total_number_of_visitors: i8,
}

#[near_bindgen]
impl Visitor {
    pub fn show_previous_visitor(&self) -> std::string::String {
        let result;
        if self.total_number_of_visitors == 0 {
            result = "You are the first one!".to_string();
        } else {
            result = self.previous_visitor.clone();
        };
        env::log(result.as_bytes());
        return result;
    }

    pub fn show_total_number_of_visitors(&self) -> std::string::String {
        let result= self.total_number_of_visitors.to_string();
        env::log(result.as_bytes());
        return result;
    }

    pub fn visit_with_name(&mut self, visitor_name: String) {
        if self.total_number_of_visitors == 0 {
            let log_message = format!("Hi {}, you are the first one, gz!", visitor_name);
            env::log(log_message.as_bytes());
        }
        self.total_number_of_visitors += 1;
        self.previous_visitor = visitor_name;
        let log_message = format!("Total number of visitors is {}", self.total_number_of_visitors);
        env::log(log_message.as_bytes());
    }
}