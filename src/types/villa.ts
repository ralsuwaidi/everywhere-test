interface Villa {
  villa: {
    id: number;
    name: string;
    description: string;
    villa_email: string;
    villa_phone_number: string;
    check_in_time: string;
    check_out_time: string;
    cancellation_policy: string;
    regulations: string;
    owner_has_insurance: boolean;
    insurance_amount: string;
    max_adult_guests: number;
    addons: any[];
    max_child_guests: number;
    faqs: any[];
    images: any[];
    review_status: string;
    area_sq_feet: string;
    booking_advance_notice: number;
    amenities: any[];
    rooms: Room[];
    slug: string;
    deals: any[];
  };
}
