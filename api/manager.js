const Job = require('./model');

const Manager = {
    getAll: async () => {
        return await Job.find({});
    },
    getById: async id => {
        const t = await Job.findById(id);
        if (t === null)
            return false;

        return t;
    },
    add: async t => {
        let job = new Job({ ...t });
        const r = await job.save();
        if (r === null)
            return false;

        return r;
    },
    update: async (id, t) => {
        const r = await Job.findByIdAndUpdate(id, {
            $set: {
                title: t.title,
                description: t.description,
                skills: t.skills,
                dateUpdated: t.dateUpdated
            }
        }, {
            new: true
        });
        return r;
    },
    delete: async id => {
        const t = await Job.findByIdAndDelete(id);
        if (t === null) return false;

        return t;
    }
};

module.exports = Manager;