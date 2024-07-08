interface IUpdateStatusDTO {
  id: number;
  active: boolean;
  updated_by: number;
}

interface IDefaultSelectDTO {
  id: number;
  name: string;
}

interface ISalesCommissionSellerDTO {
  id: number;
  name: string;
  payee_id: number;
}

interface IDefaultSelectCurrencyDTO {
  id: number;
  name: string;
  symbol: string;
  code: string;
}

interface IDefaultSelectProcessDTO {
  id: number;
  process_ref: string;
}

interface IDefaultSelectMasterDTO {
  id: number;
  master_ref: string;
  modality: string;
  master_type: string;
}

interface ISelectCountryDTO {
  code: string;
  name: string;
}

interface IUpdateLogoDTO {
  id: number;
  file_name: string;
  file_url: string;
  file_key?: string;
  updated_by: number;
}

interface ITotalDTO {
  currency: string;
  total_value: number;
}
interface ITotalsDTO {
  by_type: ITotalDTO[];
  by_currency: ITotalDTO[];
}

export {
  IUpdateStatusDTO,
  IDefaultSelectDTO,
  IDefaultSelectProcessDTO,
  IDefaultSelectMasterDTO,
  ISelectCountryDTO,
  IUpdateLogoDTO,
  IDefaultSelectCurrencyDTO,
  ISalesCommissionSellerDTO,
  ITotalsDTO,
  ITotalDTO,
};
