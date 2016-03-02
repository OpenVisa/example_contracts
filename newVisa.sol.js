contract newVisa {

    // Create a new Visa
    function Visa(uint8 address_sender, address_reciever) {

        // visa details
        exp_date = Date;
        date_issued = Date;
        date_renewed = Date; //if applicable
        address_sender = 0x123; // msg.sender
        address_reciever = 0x123; // msg.reciever
        authorized_by = String; //gov official authorized visa
        country_of_origin = String;
        holder_name = String;
        date_of_birth = Date;
        visa_type = String; //ex: regular
        visa_class = String; //purpose of travel
        annotation = String; //message
        passport_number = Number;
        entrance_max = Number;
        entrance_count = 0; //starts at 0
        in_country = false;
        latest_payment_made = true;
        status = String;

    }

    //'tagging in'  
    function enter(){ 
        current_date = new Date();
        if( entrance_count <= entrance_max && current_date < exp_date ){
            // allow entry 
            enter[address_reciever];
            // update entrance_count and in_country variables
            entrance_count += 1;
            in_country = true;
        } else {
            //entry not allowed
            status = 'Entry denied';
            return false;
        }
    }


    //'tagging off'  
    function exit(){
        
        //update in_country variable
        exit[address_reciever];
        in_country = false;
    }


    function expire(){

        current_date = new Date();
        if(current_date > exp_date && latest_payment_made == false){
             //visa has expired and has not been renewed
             status = 'Visa has Expired';
            if(in_country == false){
                return false;
            } else if(in_country == true){
                //officials will be notified
                alert[address_sender];
            }
        }
    }

    function renew(){

        //renewal fee paid
        payment[address_sender];

        //update the expiration date, date renewed, exntrance_max
        current_date = new Date();
        exp_date += 6months; //example renewal guidelines 
        date_renewed = current_date;
        entrance_max += 3; //example renewal guidelines 
        latest_payment_made = true;
    }


    function checkStatus(){
        //return visa status, payment_made, entrance_count and exp_date
        return ( status, latest_payment_made, entrance_count, exp_date );
    }

}
