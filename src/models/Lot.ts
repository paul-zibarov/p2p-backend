import DataType, { Sequelize }  from "sequelize"

export default (sequelize: Sequelize) => {
    const Lot = sequelize.define(
        "Lot",
        {
            id: {
                type: DataType.INTEGER,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: "id",
            },
            lotId: {type: DataType.INTEGER, field: "lot_id"},
            status: {type: DataType.INTEGER, field: "status"},
            sellerAddress: {type: DataType.STRING, field: "seller_address"},
            proposedAssetAddress: {type: DataType.STRING, field: "proposed_asset_address"},
            proposedAssetId: {type: DataType.INTEGER, field: "proposed_asset_id"},
            proposedAmount: {type: DataType.INTEGER, field: "proposed_asset_amount"},
            askedAssetAddress: {type: DataType.STRING, field: "asked_asset_address"},
            askedAssetId: {type: DataType.INTEGER, field: "asked_asset_id"},
            askedAmount: {type: DataType.INTEGER, field: "asked_asset_amount"},
            txHash: {type: DataType.STRING, field: "tx_hash"},
            txHashSuccess: {type: DataType.STRING, field: "tx_hash_success"},
            createdAt: {type: DataType.INTEGER, field: "created_at"},
        },
        {
            tableName: "lots",
            timestamps: false,
        }
    )

    return Lot
}