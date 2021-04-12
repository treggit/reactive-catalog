package cmokmz.reactivecatalog.domain

import javax.persistence.Access
import javax.persistence.AccessType
import javax.persistence.Embeddable
import javax.persistence.Entity

@Embeddable
class ProductCost(var value: Double, var currency: Currency)