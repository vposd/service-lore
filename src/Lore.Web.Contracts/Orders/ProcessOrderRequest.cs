using System;
using System.Collections.Generic;
using System.Linq;
using Lore.Application.Orders.Commands.UpsertOrder;

namespace Lore.Web.Contracts.Orders
{
    public class ProcessOrderRequest
    {
        public long Id { get; set; }
        public OrderCustomerModel Customer { get; set; }
        public OrderDeviceModel Device { get; set; }
        public IEnumerable<ExistingAttribute>? DeviceAttributes { get; set; }
        public IEnumerable<CreatingAttribute>? DeviceAttributesToCreate { get; set; }
        public IEnumerable<SimpleEntityModel> Failures { get; set; }
        public IEnumerable<OrderItemModel> Items { get; set; }
        public DateTime DateIn { get; set; }
        public DateTime? DateOut { get; set; }
        public string Description { get; set; }

        public static UpsertOrderCommand ToCommand(ProcessOrderRequest request)
            => new UpsertOrderCommand
            {
                Id = request.Id,
                DateIn = request.DateIn,
                DateOut = request.DateOut,
                Description = request.Description,
                Items = request.Items.Select(x => new OrderItemCommandModel
                {
                    Id = x.Id,
                    ProductId = x.ProductId,
                    Amount = x.Amount,
                    Quantity = x.Quantity
                }),
                Failures = request.Failures.Select(x => new SimpleEntityCommandModel
                {
                    Id = x.Id,
                    Name = x.Name
                }),
                Customer = new CustomerCommandModel
                {
                    Id = request.Customer.Id,
                    Name = request.Customer.Name,
                    Phone = request.Customer.Phone
                },
                Device = new DeviceCommandModel
                {
                    Id = request.Device.Id,
                    Name = request.Device.Name,
                    SerialNumber = request.Device.SerialNumber,
                    Attributes = request.Device.Attributes == null
                            ? new List<ExistingAttributeCommandModel>()
                            : request.Device.Attributes.Select(x => new ExistingAttributeCommandModel
                            {
                                AttributeId = x.AttributeId,
                                ValueId = x.ValueId
                            }),
                    AttributesToCreate = request.Device.AttributesToCreate == null
                            ? new List<CreatingAttributeCommandModel>()
                            : request.Device.AttributesToCreate.Select(x => new CreatingAttributeCommandModel
                            {
                                AttributeId = x.AttributeId,
                                Value = x.Value
                            })
                },
                DeviceAttributes = request.DeviceAttributes == null
                            ? new List<ExistingAttributeCommandModel>()
                            : request.DeviceAttributes.Select(x => new ExistingAttributeCommandModel
                            {
                                AttributeId = x.AttributeId,
                                ValueId = x.ValueId
                            }),
                DeviceAttributesToCreate = request.DeviceAttributesToCreate == null
                            ? new List<CreatingAttributeCommandModel>()
                            : request.DeviceAttributesToCreate.Select(x => new CreatingAttributeCommandModel
                            {
                                AttributeId = x.AttributeId,
                                Value = x.Value
                            })
            };
    }

    public class SimpleEntityModel
    {
        public long? Id { get; set; }
        public string Name { get; set; }
    }

    public class OrderCustomerModel
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
    }

    public class OrderDeviceModel
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public string SerialNumber { get; set; }
        public IEnumerable<ExistingAttribute>? Attributes { get; set; }
        public IEnumerable<CreatingAttribute>? AttributesToCreate { get; set; }
    }

    public class ExistingAttribute
    {
        public long AttributeId { get; set; }
        public long ValueId { get; set; }
    }

    public class CreatingAttribute
    {
        public long AttributeId { get; set; }
        public string Value { get; set; }
    }

    public class OrderItemModel
    {
        public long? Id { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Amount { get; set; }
    }

}
