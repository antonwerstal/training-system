/**
 * Для всех связей belongsTo формирует:
 * - Индекс, если нет
 * - Контроль целостности (foreign key constraint), если нет
 *
 * NOTE
 * Раньше была попытка создания таких индексов и ключей вручную, но проблема в том
 * что при ручном создании LB их не видит и думает что это лишние индексы, поэтому
 * при обновлении все эти ключи и индексы им удаляют и пересоздаются, для больших баз
 * это серьезная проблема, так как обновление на больших таблицах начинает сильно тормозить.
 * Потом LB начал поддерживать FK (foreignKeys), которые он проверяет и не удаляет если
 * они не изменились. То же самое касается индексов.
 *
 * В итоге данный метод просто добавляет определения всех внешних ключей и индексов прямо в определение
 * моделей до их обновления.
 *
 * @param source Источник данных
 * @param models Модели для формирования
 * @returns {Promise<void>}
 */
module.exports = async (source, models) => {
    for (let modelName in models) {
        let model = models [modelName];
        if (model.dataSource === source) {
            let relations = model.relations;

            model.settings.foreignKeys = model.settings.foreignKeys || {};
            model.settings.indexes = model.settings.indexes || {};

            for (let relationName of Object.keys(relations || {})) {
                let relation = relations [relationName];

                if (relation.type === 'belongsTo' && (relation.options && relation.options.onDelete !== false)) {
                    let constraintName = `${modelName}_${relation.keyFrom}_${relation.keyTo}_fk`.toLowerCase();
                    let indexName = `${modelName}_${relation.keyFrom}_idx`.toLowerCase();
                    const onDelete = relation.options.onDelete || 'SET NULL';
                    const onUpdate = relation.options.onUpdate || 'SET NULL';

                    // формируем внешний ключ с контролем целостности
                    if (!model.settings.foreignKeys[constraintName]) {
                        model.settings.foreignKeys[constraintName] = {
                            name: constraintName.toLowerCase(),
                            entity: relation.modelTo.modelName,
                            entityKey: relation.keyTo.toLowerCase(),
                            foreignKey: relation.keyFrom.toLowerCase(),
                            onDelete,
                            onUpdate
                        };
                    }

                    // добавляем индекс по внешнему ключу
                    if (!model.settings.indexes[indexName]) {
                        model.settings.indexes[indexName] = {
                            keys: {}
                        };
                        model.settings.indexes[indexName].keys[relation.keyFrom] = 1;
                    }
                }
            }
        }
    }
};
