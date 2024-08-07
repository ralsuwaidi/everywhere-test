interface Deal {
  id: number;
  name: string;
  deal_type: string;
  discount_value: number;
  display_start_date: string;
  display_end_date: string;
  usage_start_date: string;
  usage_end_date: string;
  max_nights_of_deal: number;
  min_nights: number;
  applicable_days: boolean[];
}
